import ExcelJS from 'exceljs';
import path from 'path';
import { models } from '../models';

const { ProductSku, ProductFamily, License } = models;

export const parseExcel = async (filePath) => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(path.join(__dirname, filePath));
  const worksheet = workbook.getWorksheet('Microsoft_Retail');
  const rowCount = worksheet.actualRowCount;
  const rows = worksheet.getRows(6, rowCount - 5);
  let productSkuObjs = [];
  let title = null;
  let productFamily = null;
  let license = null;
  for (const row of rows) {
    if (row.values.length === 7) {
      title = '';
      license = await License.create({ name: row.values[6] });
      if (productSkuObjs.length > 0) {
        await ProductSku.bulkCreate(productSkuObjs);
      }
      productSkuObjs = [];
      productFamily = null;
    } else if (row.values.length === 6) {
      if (productSkuObjs.length > 0) {
        await ProductSku.bulkCreate(productSkuObjs);
      }
      title = row.values[5] || '';
      productSkuObjs = [];
      productFamily = null;
    } else if (row.values.length === 18) {
      if (!productFamily) {
        const [
          ,
          ,
          ,
          ,
          ,
          name,
          ,
          ,
          ,
          ,
          type = '',
          ,
          ,
          os = '',
          ,
          ,
          licenseComment = '',
        ] = row.values;
        productFamily = await ProductFamily.create({
          LicenseId: license ? license.id : null,
          name,
          type,
          os,
          licenseComment,
          title,
        });
      }
      const [
        ,
        comment = '',
        softSku = '',
        vendorSku = '',
        softLineProductFamily = '',
        ,
        description = '',
        version = '',
        language = '',
        versionType1 = '',
        ,
        versionType2 = '',
        media = '',
        ,
        licenseLevel = '',
        point = '',
        ,
        retail = '',
      ] = row.values;
      productSkuObjs.push({
        ProductFamilyId: productFamily.id,
        comment,
        softSku,
        vendorSku,
        softLineProductFamily,
        description,
        version,
        language,
        versionType1,
        versionType2,
        media,
        licenseLevel,
        point,
        retail,
      });
    }
  }
  if (productSkuObjs.length > 0) {
    await ProductSku.bulkCreate(productSkuObjs);
  }
};
