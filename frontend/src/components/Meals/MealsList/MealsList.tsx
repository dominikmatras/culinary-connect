import { useState } from 'react'
import { PAGE_SIZE } from '../../../utils/constants'
import { useMeals } from '../../../hooks/Meals/useMeals'
import Pagination from '../../ui/Pagination/Pagination'
import MealItem from '../MealItem/MealItem'
import Spinner from '../../ui/Spinner/Spinner'
import './MealsList.less'

type MealsListProps = {
	searchedValue: string
}

export type Meal = {
	id: number
	name: string
	price: number
	photoPath?: string
}

const MealsList = ({ searchedValue }: MealsListProps) => {
	const [page, setPage] = useState(1)
	const { meals, isLoading } = useMeals()
	if (isLoading || !meals) return <Spinner />

	const pagedMeals = meals.slice(page * PAGE_SIZE - PAGE_SIZE, PAGE_SIZE * page)

	const filteredMeals = pagedMeals.filter((meal: Meal) =>
		meal.name.toLowerCase().includes(searchedValue)
	)

	return (
		<>
			<div className="meals-list">
				<ul className="meals-list__list">
					{filteredMeals.map((meal: Meal) => {
						return (
							<MealItem
								key={meal.id}
								id={meal.id}
								name={meal.name}
								price={meal.price}
								photoPath={meal.photoPath}
							/>
						)
					})}
				</ul>
			</div>
			<Pagination
				className="meals-list__pagination"
				pageSize={PAGE_SIZE}
				count={meals.length}
				setPage={setPage}
				page={page}
			/>
		</>
	)
}

export default MealsList
