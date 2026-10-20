import DashboardController from './DashboardController'
import ClientController from './ClientController'
import NotificationController from './NotificationController'
import SettingsController from './SettingsController'
import ArticleController from './ArticleController'
import CategorieArticleController from './CategorieArticleController'
import ProduitController from './ProduitController'
import CommandeController from './CommandeController'
import AvisController from './AvisController'
import MessageContactController from './MessageContactController'
const Admin = {
    DashboardController: Object.assign(DashboardController, DashboardController),
ClientController: Object.assign(ClientController, ClientController),
NotificationController: Object.assign(NotificationController, NotificationController),
SettingsController: Object.assign(SettingsController, SettingsController),
ArticleController: Object.assign(ArticleController, ArticleController),
CategorieArticleController: Object.assign(CategorieArticleController, CategorieArticleController),
ProduitController: Object.assign(ProduitController, ProduitController),
CommandeController: Object.assign(CommandeController, CommandeController),
AvisController: Object.assign(AvisController, AvisController),
MessageContactController: Object.assign(MessageContactController, MessageContactController),
}

export default Admin