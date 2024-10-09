// styles
import './CSS/index.css';
// hooks
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
// components
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
