import React, { Component } from 'react';

import { CardDeck, Modal } from 'react-bootstrap';

import KanbanColumn from '../KanbanColumn';

export default class KanbanBoard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: [],
            card: {},
            draggedOverCol: 0,
            show: false,
        };

        this.columns = [
            { name: 'To do', stage: 1 },
            { name: 'Doing', stage: 2 },
            { name: 'Do', stage: 3 },
        ];

        this.handleOnDragEnter = this.handleOnDragEnter.bind(this);
        this.handleOnDragEnd = this.handleOnDragEnd.bind(this);
        this.handleOnChangeInput = this.handleOnChangeInput.bind(this);
        this.handleAddCard = this.handleAddCard.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSaveCard = this.handleSaveCard.bind(this);
    }

    componentDidMount() {
        this.setState({ cards: cardList });
    }

    handleOnDragEnter(stageValue) {
        this.setState({ draggedOverCol: stageValue });
    }

    handleOnDragEnd(card) {
        const { cards } = this.state;

        cards.find((x) => (x._id === card._id)).cardStage = this.state.draggedOverCol;

        this.setState({ cards });
    }

    handleOnChangeInput(event) {
        const field = event.target;
        const { card } = this.state;
        card[field.id] = field.value;

        this.setState({ card });
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleAddCard() {
        this.setState({ show: true });
    }

    handleSaveCard(e) {
        e.preventDefault();

        const { card, cards } = this.state;

        card._id = `_${Math.random().toString(36).substr(2, 9)}`;
        card.cardStage = 1;

        cards.push(card);


        this.setState({ card: {}, cards, show: false });
        this.setState({ show: false });
    }

    render() {
        const { cards, show } = this.state;

        return (
            <>
                <CardDeck>
                    {this.columns.map((column) => (
                        <KanbanColumn
                            key={column.stage}
                            name={column.name}
                            stage={column.stage}
                            cards={cards.filter((card) => (parseInt(card.cardStage, 10) === column.stage))}
                            onDragEnter={this.handleOnDragEnter}
                            onDragEnd={this.handleOnDragEnd}
                            onAddCard={this.handleAddCard}
                        />
                    ))}
                </CardDeck>

                <Modal show={show} onHide={this.handleClose}>
                    <form onSubmit={this.handleSaveCard}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row">
                                <div className="form-group col-12">
                                    <label>Name:</label>
                                    <input type="text" className="form-control" id="name" required onChange={this.handleOnChangeInput} />
                                </div>
                                <div className="form-group col-12">
                                    <label>Description:</label>
                                    <textarea className="form-control" id="description" required onChange={this.handleOnChangeInput} ></textarea>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="submit" color="primary" className="btn btn-primary">Save</button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </>
        );
    }
}


const cardList = [
    {
        _id: 1,
        name: 'Card 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
        cardStage: 1
    },
    {
        _id: 2,
        name: 'Card 2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
        cardStage: 2
    },
    {
        _id: 3,
        name: 'Card 3',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ',
        cardStage: 3
    }
]