import BaseView from '~/helpers/backbone/base';
import {template} from './footer.hbs';

export default class Footer extends BaseView {

    constructor() {
        super({
            el: '#footer'
        });
    }

    initialize() {
        super.initialize({
            template: template
        });
    }
}
