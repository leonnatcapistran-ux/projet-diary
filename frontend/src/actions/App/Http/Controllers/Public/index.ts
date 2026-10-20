import HomeController from './HomeController'
import CatalogueController from './CatalogueController'
import BlogController from './BlogController'
import ProductController from './ProductController'
const Public = {
    HomeController: Object.assign(HomeController, HomeController),
CatalogueController: Object.assign(CatalogueController, CatalogueController),
BlogController: Object.assign(BlogController, BlogController),
ProductController: Object.assign(ProductController, ProductController),
}

export default Public