import Backbone from 'backbone';
import appView from '~/components/shell/shell';

class Router extends Backbone.Router {

    constructor() {
        super({
            routes: {
                '': 'home',
                '*actions': 'default'
            }
        });
    }

    home() {
        appView.render('home');
    }

    default() {
        appView.render('404');
    }

}

let router = new Router();

export default router;
