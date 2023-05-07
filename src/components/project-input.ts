import {Component} from './base-component';
import * as Validation from '../util/validation';
import {autoBindDecorator} from '../decorators/autobind';
import {projectState} from '../state/project-state';

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        super('project-input', 'app', true, 'user-input');

        this.titleInputElement = this.element.querySelector('#title')!;
        this.descriptionInputElement = this.element.querySelector('#description')!;
        this.peopleInputElement = this.element.querySelector('#people')!;

        this.configure();
        this.renderContent();
    }

    configure(): void {
        this.element.addEventListener('submit', this.submitHandler);
    }

    renderContent(): void {
    }

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = +this.peopleInputElement.value;

        const titleValidatable: Validation.Validatable = {
            value: enteredTitle,
            required: true
        };

        const descriptionValidatable: Validation.Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };

        const peopleValidatable: Validation.Validatable = {
            value: enteredPeople,
            required: true,
            min: 1,
            max: 5
        };

        if (
            !Validation.validate(titleValidatable) ||
            !Validation.validate(descriptionValidatable) ||
            !Validation.validate(peopleValidatable)
        ) {
            alert('Invalid input. Please try again!');
        } else {
            return [enteredTitle, enteredDescription, enteredPeople];
        }
    }

    @autoBindDecorator
    private submitHandler(event: Event): void {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            projectState.addProject(title, description, people);

            this.clearInputs();
        }
    }

    private clearInputs(): void {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }
}