import React from 'react';

import ViewList from 'material-ui/svg-icons/action/view-list';
import FiberManualRecord from 'material-ui/svg-icons/av/fiber-manual-record';
import colorPallete from '../util/styles/color-pallete';
import Radium, { Style, StyleRoot } from 'radium';

const styles={
    root:{
        zIndex:'999'
    },
    legendContainer:{
        minWidth: '200px',
        minHeight: '0',
        maxHeight: '0',
        backgroundColor: '#fff', 
        position: 'absolute', 
        borderRadius: '2px', 
        top:'22px', 
        transition: 'all 1s',
        overflow:'hidden',
        boxShadow: '0 2px 4px 0 rgba(0,0,0, 0.5)',
        zIndex: '9999',
        
        childContainer:{
            display: 'flex', 
            alignItems:'center', 
            backgroundColor: colorPallete.lightBgColor, 
            padding: '15px'
        }
    },
    legendHoverStyle : {
        '.legend:hover ~ .legendContainer' :{
            minHeight: '100px !important',
            maxHeight: '999px !important'
        }
    },
    claimStatusBoxContainer:  {
        width: '17px',
        height: '17px',
        display: 'block',
        marginLeft: '-25px',
        marginTop: '-2px',
        position: 'absolute',
        backgroundColor: 'red'
    },
    statusBox: {
        marginLeft: '25px',
        marginTop: '5px',
        height:'15px',
        width: '15px'
    },
    positionRelative:{
        position: 'relative'
    },
    defaultLegend:{
        marginLeft: '20px'
    },
    statusLegend:{
        color: colorPallete.primaryColor, 
        marginLeft: '15px', 
        fontSize: '14px', 
        letterSpacing: '0.3px', 
        fontWeight: 'bold'
    },
    rowColor:{
        display:'flex', 
        alignItems: 'center', 
        padding:'5px 4px'
    },
    spanColor:{
        display: 'block', 
        width: '17px', 
        height: '17px',
        marginRight: '20px'
    },
    rowColorLabel:{
        color: colorPallete.f5f5f5, 
        marginLeft: '20px'
    },
    padding15:{
        padding: '15px'
    },
    marginLeft25:{
        marginLeft: '25px'
    }
};



/*
 * 
 * @class CustomLegend
 * @extends {React.Component}
 */

/**
 * 
 * 
 * @class CustomLegend
 * @extends {React.Component}
 */
@Radium
class CustomLegend extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const { legends, iconChange , statusColor, leftPosition } = this.props;
        return(
            <StyleRoot style={styles.root}>
                <div>
                    <Style scopeSelector=".legends-status" rules={styles.legendHoverStyle}/>
                    <div className="legends-status" style={styles.positionRelative}>
                        { 
                            iconChange && statusColor 
                            ? 
                                <FiberManualRecord title="Legend" className="legend" color={statusColor} 
                                    style={styles.marginLeft25}
                                />

                            : iconChange && !statusColor ?
                                <FiberManualRecord title="Legend" className="legend" color={'pink'} 
                                    style={styles.marginLeft25}
                                />
                            :
                                <ViewList title="Legend" className="legend"  color={colorPallete.mediumGray} style={styles.defaultLegend}/>
                        }
                        <div className="legendContainer" style={[styles.legendContainer, {left: leftPosition ? leftPosition : '29px'}]}>
                            <div style={styles.legendContainer.childContainer}>
                                <ViewList color={colorPallete.primaryColor} />
                                <label style={styles.statusLegend}>STATUS LEGEND</label>
                            </div>
                            <div style={styles.padding15}>
                                {
                                    legends.map((legend, i) => (
                                        <div style={styles.rowColor} key={i}>
                                            <FiberManualRecord color={legend.color}></FiberManualRecord>
                                            <label style={styles.legendLabel}>{legend.label}</label>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </StyleRoot>
        );
    }
}

export default CustomLegend;

