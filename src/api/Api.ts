/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface User {
  /**
   * Логин
   * @minLength 1
   * @maxLength 150
   */
  username: string;
  /**
   * Пароль
   * @minLength 1
   * @maxLength 128
   */
  password: string;
  /**
   * Is staff
   * @default false
   */
  is_staff?: boolean;
  /**
   * Is superuser
   * @default false
   */
  is_superuser?: boolean;
}

export interface Reactor {
  /** ID */
  id?: number;
  /** Image */
  image?: string;
  /**
   * Название
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /**
   * Описание
   * @minLength 1
   * @maxLength 500
   */
  description: string;
  /** Статус */
  status?: 1 | 2;
  /** Fuel */
  fuel?: string;
}

export interface Station {
  /** ID */
  id?: number;
  /** Reactors */
  reactors?: string;
  /** Owner */
  owner?: string;
  /** Moderator */
  moderator?: string;
  /** Статус */
  status?: number;
  /**
   * Дата создания
   * @format date-time
   */
  date_created?: string | null;
  /**
   * Дата формирования
   * @format date-time
   */
  date_formation?: string | null;
  /**
   * Дата завершения
   * @format date-time
   */
  date_complete?: string | null;
  /** Name */
  name?: string | null;
  /** Location */
  location?: string | null;
  /**
   * Year
   * @min -2147483648
   * @max 2147483647
   */
  year?: number | null;
}

export interface ReactorStation {
  /** ID */
  id?: number;
  /**
   * Поле м-м
   * @min -2147483648
   * @max 2147483647
   */
  value?: number;
  /** Reactor */
  reactor?: number | null;
  /** Station */
  station?: number | null;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:8000/api" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://localhost:8000/api
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  login = {
    /**
     * No description
     *
     * @tags Accounts
     * @name LoginCreate
     * @request POST:/login/
     * @secure
     */
    loginCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/login/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  logout = {
    /**
     * No description
     *
     * @tags Accounts
     * @name LogoutCreate
     * @request POST:/logout/
     * @secure
     */
    logoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/logout/`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  reactors = {
    /**
     * @description Получить список реакторов
     *
     * @tags Reactors
     * @name getReactorList
     * @request GET:/reactors/
     * @secure
     */
    getReactorList: (params: {reactor_name?: string} & RequestParams = {}) =>
      this.request<void, any>({
        path: `/reactors/`,
        method: "GET",
        secure: true,
        query: {
          reactor_name: params.reactor_name
        },
        ...params,
      }),

    /**
     * @description Добавить новый реактор
     *
     * @tags Reactors
     * @name CreateReactor
     * @request POST:/reactors/
     * @secure
     */
    createReactor: (data: Reactor, params: RequestParams = {}) =>
      this.request<Reactor, any>({
        path: `/reactors/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Получить информацию о реакторе
     *
     * @tags Reactors
     * @name getSingleReactor
     * @request GET:/reactors/{reactor_id}/
     * @secure
     */
    getSingleReactor: (reactorId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/reactors/${reactorId}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description Добавить реактор на станцию
     *
     * @tags Reactors
     * @name AddSingleReactor
     * @request POST:/reactors/{reactor_id}/
     * @secure
     */
    addSingleReactor: (reactorId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/reactors/${reactorId}/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description Изменить информацию о реакторе
     *
     * @tags Reactors
     * @name EditSingleReactor
     * @request PUT:/reactors/{reactor_id}/
     * @secure
     */
    editSingleReactor: (reactorId: string, data: Reactor, params: RequestParams = {}) =>
      this.request<Reactor, any>({
        path: `/reactors/${reactorId}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Удалить данные о реакторе
     *
     * @tags Reactors
     * @name DeleteSingleReactor
     * @request DELETE:/reactors/{reactor_id}/
     * @secure
     */
    deleteSingleReactor: (reactorId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/reactors/${reactorId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Добавить фото реактора
     *
     * @tags Reactors
     * @name AddReactorPhoto
     * @request POST:/reactors/{reactor_id}/update_image/
     * @secure
     */
    addReactorPhoto: (reactorId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/reactors/${reactorId}/update_image/`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  stations = {
    /**
     * @description Получить список станций
     *
     * @tags Stations
     * @name GetStationsList
     * @request GET:/stations/
     * @secure
     */
    getStationsList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/stations/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description Получить информацию о станции
     *
     * @tags Stations
     * @name GetSingleStation
     * @request GET:/stations/{station_id}/
     * @secure
     */
    getSingleStation: (stationId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/stations/${stationId}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description Изменить информацию о станции
     *
     * @tags Stations
     * @name ChangeSingleStation
     * @request PUT:/stations/{station_id}/
     * @secure
     */
    changeSingleStation: (stationId: string, data: Station, params: RequestParams = {}) =>
      this.request<Station, any>({
        path: `/stations/${stationId}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Удалить информацию о станции
     *
     * @tags Stations
     * @name DeleteSingleStation
     * @request DELETE:/stations/{station_id}/
     * @secure
     */
    deleteSingleStation: (stationId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/stations/${stationId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Модерировать станцию
     *
     * @tags Stations
     * @name ModerateStation
     * @request PUT:/stations/{station_id}/update_status_admin/
     * @secure
     */
    moderateStation: (stationId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/stations/${stationId}/update_status_admin/`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * @description Сформировать станцию
     *
     * @tags Stations
     * @name SubmitStation
     * @request PUT:/stations/{station_id}/update_status_user/
     * @secure
     */
    submitStation: (stationId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/stations/${stationId}/update_status_user/`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * @description Изменить м-м
     *
     * @tags ReactorStations
     * @name ChangeSingleReactorstation
     * @request PUT:/stations/{station_id}/{reactor_id}/
     * @secure
     */
    changeSingleReactorstation: (
      stationId: string,
      reactorId: string,
      value: number | undefined,
      params: RequestParams = {},
    ) =>
      this.request<ReactorStation, any>({
        path: `/stations/${stationId}/${reactorId}/`,
        method: "PUT",
        body: {"value": value},
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Отменить м-м
     *
     * @tags ReactorStations
     * @name DeleteSingleReactorstation
     * @request DELETE:/stations/{station_id}/{reactor_id}/
     * @secure
     */
    deleteSingleReactorstation: (stationId: string, reactorId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/stations/${stationId}/${reactorId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags user
     * @name UserUserList
     * @request GET:/user/user/
     * @secure
     */
    userUserList: (params: RequestParams = {}) =>
      this.request<User[], any>({
        path: `/user/user/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserUserCreate
     * @request POST:/user/user/
     * @secure
     */
    userUserCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/user/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserUserRead
     * @request GET:/user/user/{id}/
     * @secure
     */
    userUserRead: (id: number, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/user/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserUserUpdate
     * @request PUT:/user/user/{id}/
     * @secure
     */
    userUserUpdate: (id: number, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/user/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserUserPartialUpdate
     * @request PATCH:/user/user/{id}/
     * @secure
     */
    userUserPartialUpdate: (id: number, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/user/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserUserDelete
     * @request DELETE:/user/user/{id}/
     * @secure
     */
    userUserDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user/user/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
}
