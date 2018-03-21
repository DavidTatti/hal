import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import browserEnv from 'browser-env';

browserEnv();

configure({ adapter: new Adapter() });
