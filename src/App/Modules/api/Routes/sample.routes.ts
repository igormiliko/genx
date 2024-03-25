
import AbstractRoute from '../../../Core/Route';
import { TAddMiddlewareToReturn } from '../../../Router/Router';

class Sample extends AbstractRoute {
    protected merger(): void {}
    public addMiddlewareTo(): TAddMiddlewareToReturn  {}
}

export default Sample
