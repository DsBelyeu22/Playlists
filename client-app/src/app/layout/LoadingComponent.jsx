import { Dimmer, Loader } from "semantic-ui-react";
import PropTypes from 'prop-types'


export default function LoadingComponent(props) {
    return (
        <Dimmer active={true} inverted={props?.inverted} >
            <Loader content={props?.content} />
        </Dimmer>
    )
}

LoadingComponent.propTypes = {
    inverted: PropTypes.bool,
    content: PropTypes.string
}