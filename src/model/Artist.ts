import moment, {Moment} from "moment";

export default class Artist {
    id?: number;
    name: string;
    creationDate?: Moment;

    constructor(name: string, id?: number, creationDate?: number) {
        this.id = id ? id : undefined;
        this.name = name;
        this.creationDate = creationDate ? moment(creationDate): undefined;
    }
}
