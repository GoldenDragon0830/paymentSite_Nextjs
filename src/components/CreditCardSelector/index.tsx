import React, { Fragment, useEffect } from 'react'
import { v4 as uuid } from 'uuid'

import { CircleIconButton } from '@components/CircleIconButton'
import { CreditCardElement } from '@components/CreditCardElement'
import { LargeRadio } from '@components/LargeRadio'
import { LoadingShimmer } from '@components/LoadingShimmer'
import { Team } from '@root/payload-cloud-types'
import { useGetPaymentMethods } from '../CreditCardList/useGetPaymentMethods'
import { useGetCustomer } from './useGetCustomer'
import { useGetSubscription } from './useGetSubscription'

import classes from './index.module.scss'

type CreditCardSelectorType = {
  team: Team
  initialValue?: string
  onChange?: (method?: string) => void // eslint-disable-line no-unused-vars
}

const Selector: React.FC<CreditCardSelectorType> = props => {
  const { onChange, initialValue, team } = props
  const newCardID = React.useRef<string>(`new-card-${uuid()}`)
  const [internalState, setInternalState] = React.useState(initialValue || newCardID.current)
  const [showNewCard, setShowNewCard] = React.useState(false)

  const {
    result: cards,
    error: paymentMethodError,
    isLoading: loadingPaymentMethods,
  } = useGetPaymentMethods({ team })

  // update the internal state when the payment methods change
  // preselect the first card if there is only one
  // generate a unique id for the new card, prefixed with `new-card`
  // this will allow us to differentiate from a saved card in the checkout process
  useEffect(() => {
    const firstCard = cards?.[0]?.id
    newCardID.current = `new-card-${uuid()}`
    setShowNewCard(!firstCard)
    setInternalState(firstCard || newCardID.current)
  }, [cards, newCardID])

  useEffect(() => {
    if (typeof onChange === 'function') {
      onChange(internalState)
    }
  }, [onChange, internalState])

  const isNewCard = internalState === newCardID.current

  if (loadingPaymentMethods) {
    return <LoadingShimmer number={3} />
  }

  return (
    <div className={classes.creditCardSelector}>
      {paymentMethodError && <p className={classes.error}>{paymentMethodError}</p>}
      <div className={classes.cards}>
        {cards?.map(paymentMethod => (
          <LargeRadio
            key={paymentMethod.id}
            value={paymentMethod.id}
            checked={internalState === paymentMethod.id}
            onChange={setInternalState}
            label={`${paymentMethod?.card?.brand} ending in ${paymentMethod?.card?.last4}`}
            name="card"
            id={paymentMethod.id}
          />
        ))}
        {showNewCard && (
          <LargeRadio
            value={newCardID}
            checked={isNewCard}
            onChange={setInternalState}
            label={<CreditCardElement />}
            name="card"
            id={newCardID.current}
          />
        )}
      </div>
      {/* Only show the add/remove new card button if there are existing payment methods */}
      {cards?.length > 0 && (
        <div className={classes.newCardController}>
          <CircleIconButton
            onClick={() => {
              setShowNewCard(!showNewCard)
              setInternalState(
                showNewCard ? cards?.[0]?.id || newCardID.current : newCardID.current,
              )
            }}
            label={showNewCard ? 'Cancel new card' : 'Add new card'}
            icon={showNewCard ? 'close' : 'add'}
          />
        </div>
      )}
    </div>
  )
}

// Need to first load the customer so we can know their initial payment method
// Optionally pass a subscription to load its payment method as the initial value as priority
export const CreditCardSelector: React.FC<
  Omit<CreditCardSelectorType, 'customer'> & {
    stripeSubscriptionID?: string
  }
> = props => {
  const { team, stripeSubscriptionID } = props

  const {
    result: customer,
    error: customerError,
    isLoading: loadingCustomer,
  } = useGetCustomer({ stripeCustomerID: team.stripeCustomerID })

  const {
    result: subscription,
    error: subscriptionError,
    isLoading: loadingSubscription,
  } = useGetSubscription({ stripeSubscriptionID })

  if (loadingCustomer || (stripeSubscriptionID && loadingSubscription)) {
    return <LoadingShimmer number={3} />
  }

  if (customerError || (stripeSubscriptionID && subscriptionError)) {
    return (
      <Fragment>
        {customerError && <p className={classes.error}>{customerError}</p>}
        {subscriptionError && <p className={classes.error}>{subscriptionError}</p>}
      </Fragment>
    )
  }

  return (
    <Selector
      {...props}
      initialValue={
        subscription?.default_payment_method || customer?.invoice_settings?.default_payment_method
      }
    />
  )
}
