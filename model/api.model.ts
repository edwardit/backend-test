import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table({
  timestamps: false,
})
export class Apis extends Model {
  
  @Column({ type: DataType.TEXT })
  name: string

  @Column({ type: DataType.TEXT })
  desc: string

  @Column({ type: DataType.FLOAT })
  price: number

  @Column({ type: DataType.INTEGER })
  post_code: number
}