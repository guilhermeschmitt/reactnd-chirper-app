import { applyMiddleware } from 'redux';
import thunk from 'react-thunk';
import logger from './logger';

export default applyMiddleware(
    thunk,
    logger
)