import auth from './auth'
import account from './account'
import data from './data'
import notification from './notification'
import campaign from './campaign'
import network from './network'
import delegation from './delegation'
import vault from './vault'
import image from './image'
import job from './job'

// we compose all api for each category here as single entry point
// api will be an single entry point for all frame methods
// this is where common functions are put
export default {
  auth,  
  account,
  data,
  notification,
  campaign,
  network,
  delegation,
  vault,
  image,
  job
}
