//! Meal schedule - таблица графика приёма пищи - один график у одного user, пример: {id: 1, "weekday":[8,22],"weekend":[9,22]}
//  Этими декораторами потипу "@Entity()" or "@Column" СОЗДАЮТСЯ (буквально в реальном времени) таблицы в БД
// это таблица - TypeORM Entity: https://typeorm.io/entity-inheritance 
import { Recipe } from "src/recipe/entities/recipe.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity() // для объявление (создания) сущности
export class Mealschedule {

    @PrimaryGeneratedColumn({ name: 'mealschedule_id' }) // автоматически генерирует значение для id для указанную колонку с именем "recipe_id", и указанным типом
    id: number

    @Column("simple-array")
    weekday: number[]

    @Column("simple-array")
    weekend: number[]

    @CreateDateColumn() // автоматически создает дату создания каждого объекта
    createDateMeal: Date // рецепт создан такой даты

    @UpdateDateColumn() // автоматически создает дату ОБНОВЛЕНИЯ
    updateDateMeal: Date //  возможность изменить весь рецепт 

    //для связи с таблицей user: https://typeorm.io/many-to-one-one-to-many-relations 
    //! Одна таблица графика + один пользователь
    @OneToOne(() => User, (user) => user.mealschedule)
    // объеденим в одну колонку 'user_id' - хотя зачем? пусть пока будет
    @JoinColumn({ name: 'user_id' }) // колонка "user_id" будет иметь связь с user.id
    // описание связи с типом (это не поле)
    user: User

    //* для связи с таблицей recipe
    @OneToMany(() => Recipe, (recipe) => recipe.mealschedule)
    // описание связи с типом (это не поле)
    recipes: Recipe[]

}
