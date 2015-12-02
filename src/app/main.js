import Backbone from 'backbone';
import router from '~/router';
import appView from '~/components/shell/shell';

const EXTERNAL = /^((f|ht)tps?:)?\/\//;
const MAILTO = /^mailto:(.+)/;

function rootEl(path, Element) {
    if (path instanceof Array) {
        for (let i=0, len=path.length; i < len; i++) {
            if (path[i] instanceof Element) {
                return path[i];
            }
        }
    }
}

class App {

    constructor() {
        this.router = router;
        this.view = appView;

        Backbone.history.start({
            hashChange: false,
            pushState: true
        });

        document.addEventListener('click', (e) => {
            var el;

            if (e.metaKey || e.which !== 1) {
                return;
            }

            el = rootEl(e.path, HTMLAnchorElement) || e.target;

            let href = el.getAttribute('href');

            if (!href || href.charAt(0) === '#' || e.defaultPrevented || MAILTO.test(href)) {
                return;
            }

            e.preventDefault();

            if (EXTERNAL.test(href)) {
                window.open(href, '_blank');
            } else {
                router.navigate(href, {
                    trigger: (el.getAttribute('data-trigger') !== false)
                });
            }
        });
    }

}

let app = new App();

export default app;
