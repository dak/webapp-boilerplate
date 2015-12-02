import BaseView from '~/helpers/backbone/base';
import {template} from './home.hbs';

export default class Home extends BaseView {

    constructor() {
        super({
            template: template
        });
    }
}
