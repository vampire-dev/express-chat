import * as sequelize from 'sequelize';

export interface Instance<T> extends sequelize.Instance<T> { }
export interface Model<T> extends sequelize.Model<Instance<T>, T> { };