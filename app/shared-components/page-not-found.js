import React from 'react';
import Helmet from 'react-helmet';

/**
 * Not Found Page
 * 
 * @class NotFound
 * @extends {React.Component}
 */
class PageNotFound extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
        <div>
            <Helmet title="Page Not Found" />
            Sorry we could not find that page.
        </div>
        );
    }
}

export default PageNotFound;
