import React from 'react';

class MapRoleUser extends React.Component {
    constructor(props) {
        super(props);
        console.log('maproleuser:',
            this.props.params.id
            );
    }

    render() {
        return(
            <div>map to user</div>
        );
    }
}
export default MapRoleUser;