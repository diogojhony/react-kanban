import React, { Component } from 'react';

import KanbanCard from '../KanbanCard';
import { Card } from 'react-bootstrap';

export default class KanbanColumn extends Component {
    renderKanbanCards() {
        const { cards } = this.props;

        return cards.slice(0).map((card) => (
            <KanbanCard
                key={card._id}
                card={card}
                onDragEnd={this.props.onDragEnd}
            />
        ));
    }

    render() {
        const { stage, name } = this.props;

        return (
            <Card bg="light" onDragEnter={(e) => { this.props.onDragEnter(stage); }}>
                <Card.Header>{name}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        {this.renderKanbanCards()}
                    </Card.Text>
                    {(stage === 1) ? <Card.Link href="#" onClick={(e) => { this.props.onAddCard() }}>+ Add a card</Card.Link> : null}
                </Card.Body>
            </Card>
        );
    }
}