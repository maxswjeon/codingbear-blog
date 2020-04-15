import React from "react";
import {Location, WindowLocation} from '@reach/router';

interface NotFoundProps {
    location: WindowLocation
}

function NotFound(props: NotFoundProps) {
    return (
        <div>
            {props.location.pathname}
        </div>
    );
}

export default function (props: NotFoundProps) {
    return (
        <Location>
            {locationProps => <NotFound {...locationProps} {...props}/>}
        </Location>
    )
};
