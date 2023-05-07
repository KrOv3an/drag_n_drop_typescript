import {Draggable} from '../models/drag-drop-interfaces';
import {Component} from './base-component';
import {Project} from '../models/project';
import {autoBindDecorator} from '../decorators/autobind';

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    private project: Project;

    get persons(): string {
        if (this.project.people === 1) {
            return '1 person';
        }

        return `${this.project.people} persons`;
    }

    constructor(hostId: string, project: Project) {
        super('single-project', hostId, false, project.id);
        this.project = project;

        this.configure();
        this.renderContent();
    }

    @autoBindDecorator
    dragStartHandler(event: DragEvent): void {
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.dropEffect = 'move';
        event.dataTransfer!.effectAllowed = 'move';
    }

    @autoBindDecorator
    dragEndHandler(_: DragEvent): void {
        console.info('DragEnd');
    }

    configure(): void {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }

    renderContent(): void {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.persons + ' assigned.';
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}