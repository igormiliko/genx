export default `
import AbstractRoute from '../../../Core/Route';
import { TAddMiddlewareToReturn } from '../../../Router/Router';

class {{className}} extends AbstractRoute {
    protected merger(): void {}
    public addMiddlewareTo(): TAddMiddlewareToReturn  {}
}

export default {{className}}
`