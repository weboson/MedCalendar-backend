//! User
// Этими декораторами потипу "@Entity()" or "@Column" СОЗДАЮТСЯ (буквально в реальном времени) таблицы в БД
// это таблица - TypeORM Entity: https://typeorm.io/entity-inheritance 
import { Mealschedule } from "src/mealschedule/entities/mealschedule.entity";
import { Recipe } from "src/recipe/entities/recipe.entity";
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"; // объявление сущности

@Entity() // для объявление (создания) сущности
export class User {
    @PrimaryGeneratedColumn({name: 'user_id'}) // автоматически генерирует указанную колонку, указанным типом
    id: number

    @Column({ type: "varchar" }) // https://typeorm.io/entities#column-types
    email: string

    @Column({ type: "varchar" }) // https://typeorm.io/entities#column-types
    password: string

    @CreateDateColumn() // автоматически создает дату создания каждого объекта
    createdAtUser: Date // создан такой даты

    @UpdateDateColumn()
    updateAtUser: Date // дата обновления определенного объекта

    //* связь с рецептами: один user имеет связь с нексолькими Recipes (recipe.entity.ts): https://typeorm.io/many-to-one-one-to-many-relations
    // привязываемся к схеме Recipe и именно к полю id
    // onDelete - указывает, как должен вести себя внешний ключ при удалении объекта, на который ссылается.
    @OneToMany(() => Recipe, (recipe) => recipe.user, { onDelete: 'CASCADE' }) 
    // описание связи с типом (это не поле)
    recipes: Recipe[]

    //* связь с графиком приёма пищи
    @OneToMany(() => Mealschedule, (mealschedule) => mealschedule.user, { onDelete: 'CASCADE' }) 
    // описание связи с типом (это не поле)
    mealschedule: Mealschedule

}
