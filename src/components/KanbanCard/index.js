import React, { Component } from 'react';

import { Card } from 'react-bootstrap';

export default class KanbanCard extends Component {
    render() {
        return (
            <Card
                style={cardStyle}
                draggable={true}
                onDragEnd={(e) => { this.props.onDragEnd(this.props.card); }}
            >
                <Card.Body>
                    <Card.Subtitle>{this.props.card.name}</Card.Subtitle>
                    <Card.Text>{this.props.card.description}</Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

const cardStyle = {
    margin: '10px 0'
};
