import React from 'react';
import Radium, {StyleRoot} from 'radium';
import colorPalette from '../../../../util/styles/color-pallete';
import animation from '../../../../util/styles/animation';
import ChargesDrugsAndMedicinesContainer from '../../charges-drugs-and-medicines/list/containers/list';
import XrayLabSupplyAndOthersContainer from '../../charges-xlso/list/container/list';

const styles = {
    container : {
        padding: '24px 24px 60px',
        backgroundColor: colorPalette.white,
        marginBottom: '30px',
        position: 'relative',
        marginTop: '30px',
        minHeight: 'calc(100vh - 357px)'
    },
    title: {
        color: colorPalette.primaryColor,
        fontWeight: 600,
        fontSize: '20px',
        letterSpacing: '0.6px'
    }
};

@Radium
class ChargesWrapper extends React.Component {
    
    render() {
        const {selectedClaim,summaryMode} = this.props;
        
        return (
            <StyleRoot style={[styles.container, animation.fadeIn]}>    

                <h1 style={styles.title}>CHARGES</h1>

                <ChargesDrugsAndMedicinesContainer selectedClaim={selectedClaim} summaryMode={summaryMode} />
                <XrayLabSupplyAndOthersContainer selectedClaim={selectedClaim} summaryMode={summaryMode}/>
            </StyleRoot>
        );
    }

}

export default ChargesWrapper;