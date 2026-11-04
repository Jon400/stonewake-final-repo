import { test as base } from '@playwright/test'
import {
  CitationsClient,
  CountriesClient,
  EntitiesClient,
  HealthClient,
  MeClient,
  NodesClient,
  PortfolioClient,
  SearchClient,
} from '@api/clients'
import { config } from '@config'

export interface ApiFixtures {
  healthClient: HealthClient
  meClient: MeClient
  portfolioClient: PortfolioClient
  entitiesClient: EntitiesClient
  countriesClient: CountriesClient
  searchClient: SearchClient
  nodesClient: NodesClient
  citationsClient: CitationsClient
  /** The valid API key, for tests that send it with a wrong scheme. Read only when requested. */
  apiKey: string
}

// Clients build absolute URLs from config.apiUrl and read the key per request, so the built-in
// `request` fixture is enough and a fixture that is not requested never touches the key.
export const apiTest = base.extend<ApiFixtures>({
  healthClient: async ({ request }, use) => {
    await use(new HealthClient(request))
  },
  meClient: async ({ request }, use) => {
    await use(new MeClient(request))
  },
  portfolioClient: async ({ request }, use) => {
    await use(new PortfolioClient(request))
  },
  entitiesClient: async ({ request }, use) => {
    await use(new EntitiesClient(request))
  },
  countriesClient: async ({ request }, use) => {
    await use(new CountriesClient(request))
  },
  searchClient: async ({ request }, use) => {
    await use(new SearchClient(request))
  },
  nodesClient: async ({ request }, use) => {
    await use(new NodesClient(request))
  },
  citationsClient: async ({ request }, use) => {
    await use(new CitationsClient(request))
  },
  // Playwright needs the destructuring pattern to see that this fixture has no dependencies.
  // eslint-disable-next-line no-empty-pattern
  apiKey: async ({}, use) => {
    await use(config.apiKey)
  },
})
