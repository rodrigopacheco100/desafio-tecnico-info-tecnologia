import { Entity } from '@/core/entities/entity';

export type VehicleProps = {
  plate: string;
  chassis: string;
  renavam: string;
  modelId: string;
  categoryId: string;
  year: number;
  createdAt: Date;
  updatedAt: Date;
};

export class Vehicle extends Entity<VehicleProps> {
  get plate() {
    return this.props.plate;
  }

  set plate(plate: string) {
    this.setProperty('plate', plate);
  }

  get chassis() {
    return this.props.chassis;
  }

  set chassis(chassis: string) {
    this.setProperty('chassis', chassis);
  }

  get renavam() {
    return this.props.renavam;
  }

  set renavam(renavam: string) {
    this.setProperty('renavam', renavam);
  }

  get modelId() {
    return this.props.modelId;
  }

  set modelId(modelId: string) {
    this.setProperty('modelId', modelId);
  }

  get categoryId() {
    return this.props.categoryId;
  }

  set categoryId(categoryId: string) {
    this.setProperty('categoryId', categoryId);
  }

  get year() {
    return this.props.year;
  }

  set year(year: number) {
    this.setProperty('year', year);
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(
    props: Pick<VehicleProps, 'plate' | 'chassis' | 'renavam' | 'modelId' | 'categoryId' | 'year'>,
  ) {
    const now = new Date();
    return new Vehicle({
      ...props,
      createdAt: now,
      updatedAt: now,
    });
  }

  static from(props: { id: string } & VehicleProps) {
    return new Vehicle(props);
  }
}
