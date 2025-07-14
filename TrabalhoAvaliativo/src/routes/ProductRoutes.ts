import { Router } from "express";
import { ProductController } from "../controllers/ProductController";

const router = Router();
const productController = new ProductController();

router.post("/product", productController.createProduct);
router.get("/product", productController.listProducts);
router.get("/product/:id", productController.findProductById);
router.get("/product/name/:name",productController.findByName)
router.put("/product/:id", productController.updateProducts);
router.delete("/product/:id", productController.deleteProduct);

export default router;