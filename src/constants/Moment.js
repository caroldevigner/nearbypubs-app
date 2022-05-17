import Moment from "moment";
import "moment/locale/pt-br";

global.Moment = Moment;
global.Moment.locale("pt-br");

export default global.Moment;
