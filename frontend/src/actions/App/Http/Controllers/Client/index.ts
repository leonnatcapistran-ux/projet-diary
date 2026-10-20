import CommandeController from './CommandeController'
import AvisController from './AvisController'
import MessageContactController from './MessageContactController'
const Client = {
    CommandeController: Object.assign(CommandeController, CommandeController),
AvisController: Object.assign(AvisController, AvisController),
MessageContactController: Object.assign(MessageContactController, MessageContactController),
}

export default Client