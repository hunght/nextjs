import { ArtType, EventType, Genre, LanguageType, Speciality } from '../type/entity/artType'
import { City, Location } from '../type/entity/location'
import { PaymentType } from '../type/entity/payment'
import { Currency, PackageKind, UserPackage } from '../type/entity/user'

export type AuthStackParamList = {
  SignIn: undefined
  SignInEmail: undefined
  ForgotPasswordScreen: undefined
  CheckEmailScreen: undefined
  SignUp: undefined
  OnboardEmailPassword: undefined
  OnboardFullName: undefined
  OnboardLocation: { country?: Location; city?: City; currency?: Currency }
  OnboardUserType: {
    city_id?: number
    currency_slug?: string
    country_slug?: string
  }
  OnboardArtistInfo: {
    artType?: ArtType
  }
  SpecialtyScreen: {
    artTypeSlug: string
    specialties?: Speciality[]
    genres?: Genre[]
  }
  GenreScreen: {
    genres: Genre[]
    selectedGenres?: Genre[]
  }
  EventTypeScreen: {
    eventTypes?: EventType[]
  }
  StageNameScreen: undefined
  PhoneNumberScreen: { countryCode?: Location }
  LastStepScreen: undefined
}

export type AuthModalStackParamList = {
  AuthStack: undefined
  SearchCityScreen: {
    countrySlug: string
    selectItems: Record<string, City>
  }
  SearchCurrencyScreen: { selectItems: Record<string, Currency> }
  SearchLocationScreen: { selectItems: Record<string, Location> }
  SearchCountryCodeScreen: { selectItems: Record<string, Location> }
  SearchArtTypeScreen: { selectItems: Record<string, ArtType> }
  SearchSpecialtyScreen: {
    artTypeSlug: string
    selectItems: Record<string, Speciality>
  }
  SearchGenreScreen: { genres: Genre[]; selectItems: Record<string, Genre> }
  SearchEventTypeScreen: { selectItems: Record<string, EventType> }
}

export type ProfileModalParamList = {
  ProfileStack: undefined
  SearchCityScreen: {
    countrySlug: string
    selectItems: Record<string, City>
  }
  SearchCurrencyScreen: { selectItems: Record<string, Currency> }
  SearchLocationScreen: { selectItems: Record<string, Location> }
  SearchCountryCodeScreen: { selectItems: Record<string, Location> }
  SearchArtTypeScreen: { selectItems: Record<string, ArtType> }
  SearchLanguageScreen: { selectItems: Record<string, LanguageType> }
  SearchSpecialtyScreen: {
    artTypeSlug: string
    selectItems: Record<string, Speciality>
  }
  SearchGenreScreen: { genres: Genre[]; selectItems: Record<string, Genre> }
  SearchEventTypeScreen: { selectItems: Record<string, EventType> }
}
export type ProfileTabParamList = {
  PersonalTab: {
    country?: Location
    city?: City
    currency?: Currency
    countryCode?: Location
  }
  UserPhotoTab: undefined
  UserVideoTab: undefined
  UserMusicTab: undefined
  UserAwardTab: undefined
  UserGroupMemberTab: undefined
  UserSongListTab: undefined
  UserQuestionTab: undefined
  UserExperienceTab: undefined
  UserRequirementTab: undefined
  UserPackageStack: undefined
  UserGigSettingsTab: undefined
  UserPaymentStack: undefined
  ArtistInfoTab: {
    specialties?: Speciality[]
    genres?: Genre[]
    selectedGenres?: Genre[]
    languages?: LanguageType[]
  }
}
export type ProfileStackParamList = {
  ProfileTab: undefined
  ProfileDashboardScreen: undefined
  ProfileHomeScreen: undefined
}
export type UserPackageStackParamList = {
  PackageSelectScreen: undefined
  PackageListScreen: undefined
  PackageInfoScreen: { kind?: PackageKind; userPackage?: UserPackage }
}
export type UserPaymentStackParamList = {
  UserPaymentTab: { selectedPayment: PaymentType; isCreate: boolean }
  PaymentTypeScreen: { selectedPayment?: PaymentType }
}

export type ProfileParamList = ProfileModalParamList &
  ProfileTabParamList &
  ProfileStackParamList &
  UserPackageStackParamList &
  AuthStackParamList &
  UserPaymentStackParamList
export type NavigationParamList = AuthStackParamList & AuthModalStackParamList & ProfileParamList
