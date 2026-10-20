import Public from './Public'
import Admin from './Admin'
import Client from './Client'
import Settings from './Settings'
const Controllers = {
    Public: Object.assign(Public, Public),
Admin: Object.assign(Admin, Admin),
Client: Object.assign(Client, Client),
Settings: Object.assign(Settings, Settings),
}

export default Controllers