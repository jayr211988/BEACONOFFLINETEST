import React from 'react';
import Radium, { StyleRoot } from 'radium';

/**
 * Products Component
 * 
 * @class Products
 * @extends {React.Component}
 */
@Radium
class Products extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Render
     * 
     * @returns
     * 
     * @memberOf Products
     */
    render() {
        const { children } = this.props;

        return (
            <StyleRoot>
                { this.props.children && React.cloneElement(children, {} )}
            </StyleRoot>
        );
    }
}

export default Products;