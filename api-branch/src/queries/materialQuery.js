export const MATERIAL_QUERY = {
  BY_ID: `SELECT MaterialID, MaterialName, Description, Material.CategoryID, Category.CategoryName, Material.UnitID, Unit.UnitName, Price
            FROM Material, Category, Unit
            WHERE Material.CategoryID = Category.CategoryID AND Material.UnitID = Unit.UnitID AND MaterialID = @MaterialID`,
  ALL: `SELECT MaterialID, MaterialName, Description, Material.CategoryID, Category.CategoryName, Material.UnitID, Unit.UnitName, Price
        FROM Material, Category, Unit
        WHERE Material.CategoryID = Category.CategoryID AND Material.UnitID = Unit.UnitID`,
  CREATE: `INSERT INTO Material (MaterialID, MaterialName, Description, CategoryID, UnitID, Price, Image_URL)
        VALUES (@MaterialID, @MaterialName, @Description, @CategoryID, @UnitID, @Price, @Image_URL)`,
  UPDATE: `UPDATE Material
        SET MaterialName = @MaterialName, Description = @Description, CategoryID = @CategoryID, UnitID = @UnitID, Price = @Price, Image_URL = @Image_URL
        WHERE MaterialID = @MaterialID`,
};
