import Home from './containers/Home'
import NotFound from './containers/NotFound'
import Notification from './containers/Notification'
import Login from './containers/Login'
import UserSetting from './containers/User/Setting'
import Test from './containers/Test'
import UserProfile from './containers/UserProfile'
import EventDetail from './containers/EventDetail'
import Search from './containers/Search'
import EventCreation from './containers/EventDetail/Actions/Create'
import EventUpdate from './containers/EventDetail/Actions/Update'
import Setting from './containers/Setting'
import ProfileUpdate from './containers/UserProfile/Actions/Update'
import ProblemReporter from './containers/UserProfile/Actions/ProblemReporter'
import FanHistory from './containers/FanHistory'
import FanProfile from './containers/FanProfile'
import AreUCeleb from './containers/AreYouCeleb'
import ListTopFan from './containers/ListTopFan'
// we can use animationType object for each route via Navigator.SceneConfigs
export default {
    notFound: {
        title: 'Not Found',
        Page: NotFound,
        headerType: 'none',
        footerType: 'none',
    },
    test: {
        title: 'Test',
        Page: Test,        
    },
    search: {
        title: 'Search',
        Page: Search,
        headerType: 'none',
        footerType: 'none',
        cache: true
    },
    home: {        
      title: 'Novame',
      Page: Home,
      headerType: 'home',
      footerType: 'none',
      cache: true
    },
    'userProfile': {
        title: 'User Detail',
        Page: UserProfile,
        headerType: 'none',
        footerType: 'none',
    },
    'userProfileUpdate': {
        title: 'Update Profile',
        Page: ProfileUpdate,
        headerType: 'back',
        footerType: 'none',
        cache: true,
    },
    'userProfileReport': {
        title: 'Report Problem',
        Page: ProblemReporter,
        headerType: 'back',
        footerType: 'none',
        cache: true,
    },
    'eventDetail': {
        title: 'Event',
        Page: EventDetail,
        headerType: 'none',
        footerType: 'none',
    },
    'event/create': {
        title: 'Create Event',
        Page: EventCreation,
        headerType: 'back',
        footerType: 'none',
    },
    'event/update': {
        title: 'Update Event',
        Page: EventUpdate,
        headerType: 'back',
        footerType: 'none',
    },
    setting: {
        title: 'Setting',
        Page: Setting,
        headerType: 'back',
        footerType: 'none',
    },
    fanHistory: {
        title: 'History',
        Page: FanHistory,
        headerType: 'back',
        footerType: 'none',
        cache: true
    },
    fanProfile: {
        title: 'Profile',
        Page: FanProfile,
        headerType: 'back',
        footerType: 'none',
        cache: true
    },
    notification: {
        title: 'Notification',
        Page: Notification,
        footerType: 'none',
        headerType: 'back',
        cache: true
    },
    areUCeleb: {
        title: 'Celebrity Request',
        Page: AreUCeleb,
        headerType: 'back',
        footerType: 'none'
    },
    'user/profile': {
        title: 'User Profile',
        Page: UserProfile,
        headerType: 'none',
    },  
    'user/setting': {
        title: 'User Setting',
        Page: UserSetting,
        cache: true,
    },       
    login: {
        title: 'Login',
        Page: Login,        
        headerType: 'none',
        footerType: 'none',
    },
    'listTopFan': {
        title: 'Top Fan',
        Page: ListTopFan,
        headerType: 'back',
        footerType: 'none'
    }

}
