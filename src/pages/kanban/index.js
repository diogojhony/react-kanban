import React, { Component } from 'react';

import KanbanBoard from '../../components/KanbanBoard';

export default class Kanban extends Component {
    render() {
        return (
            <div>
                <h1>Kanban Board</h1>
                <KanbanBoard />
            </div>
        );
    }
}

