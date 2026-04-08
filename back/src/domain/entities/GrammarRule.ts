export class GrammarRule {
  readonly id: string;
  readonly particle: string;
  readonly name: string;
  readonly description: string;

  constructor(id: string, particle: string, name: string, description: string) {
    this.id = id;
    this.particle = particle;
    this.name = name;
    this.description = description;
  }
}
