import AbstractService from './AbstractService';
import Credentials from '@Config/credentials'
import APIEndpoints from '@Config/apiEndpoints';

export default class NewsService extends AbstractService {
  static _getDefaultFromDate = (): string => {
    const fromDate = new Date();
    fromDate.setFullYear(new Date().getFullYear() - 1);
    return fromDate.getFullYear()
      + '-'
      + (fromDate.getMonth() + 1).toString().padStart(2, '0')
      + '-'
      + fromDate.getDate().toString().padStart(2, '0');
  }

  static _getDefaultToDate = (): string => {
    const toDate = new Date();
    return toDate.getFullYear()
      + '-'
      + (toDate.getMonth() + 1).toString().padStart(2, '0')
      + '-'
      + toDate.getDate().toString().padStart(2, '0');
  }

  static _buildEverythingQueryParams = (params): object => {
    const {search, page, domains, sortBy, fromDate, toDate, language} = params;
    return {
      apiKey: Credentials.NewsApi.key,
      q: search || 'news',
      pageSize: 50,
      page: page || 1,
      domains: domains || '',
      sortBy: sortBy || 'publishedAt',
      fromDate: fromDate || NewsService._getDefaultFromDate(),
      toDate: toDate || NewsService._getDefaultToDate(),
      language
    }
  }

  static _buildSourcesQueryParams = (params): object => {
    const {search, page, domains, sortBy, fromDate, toDate} = params;
    return {
      apiKey: Credentials.NewsApi.key,
    }
  }

  static async everything(params) {
    return this.get(APIEndpoints.everything, NewsService._buildEverythingQueryParams(params));
  }

  static async sources(params) {
    return this.get(APIEndpoints.sources, NewsService._buildSourcesQueryParams(params));
  }
}
