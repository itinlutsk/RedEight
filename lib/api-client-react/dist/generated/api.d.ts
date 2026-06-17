import type { QueryKey, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { BlogPost, Category, HealthStatus, HomepageData, ListBlogPostsParams, ListProductsParams, Product, ProjectType, Service } from './api.schemas';
import { customFetch } from '../custom-fetch';
import type { ErrorType } from '../custom-fetch';
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
export declare const getHealthCheckUrl: () => string;
/**
 * @summary Health check
 */
export declare const healthCheck: (options?: RequestInit) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListProductsUrl: (params?: ListProductsParams) => string;
/**
 * @summary List all products
 */
export declare const listProducts: (params?: ListProductsParams, options?: RequestInit) => Promise<Product[]>;
export declare const getListProductsQueryKey: (params?: ListProductsParams) => readonly ["/api/products", ...ListProductsParams[]];
export declare const getListProductsQueryOptions: <TData = Awaited<ReturnType<typeof listProducts>>, TError = ErrorType<unknown>>(params?: ListProductsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listProducts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listProducts>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListProductsQueryResult = NonNullable<Awaited<ReturnType<typeof listProducts>>>;
export type ListProductsQueryError = ErrorType<unknown>;
/**
 * @summary List all products
 */
export declare function useListProducts<TData = Awaited<ReturnType<typeof listProducts>>, TError = ErrorType<unknown>>(params?: ListProductsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listProducts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetProductUrl: (id: string) => string;
/**
 * @summary Get a product by ID
 */
export declare const getProduct: (id: string, options?: RequestInit) => Promise<Product>;
export declare const getGetProductQueryKey: (id: string) => readonly [`/api/products/${string}`];
export declare const getGetProductQueryOptions: <TData = Awaited<ReturnType<typeof getProduct>>, TError = ErrorType<void>>(id: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProduct>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getProduct>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetProductQueryResult = NonNullable<Awaited<ReturnType<typeof getProduct>>>;
export type GetProductQueryError = ErrorType<void>;
/**
 * @summary Get a product by ID
 */
export declare function useGetProduct<TData = Awaited<ReturnType<typeof getProduct>>, TError = ErrorType<void>>(id: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProduct>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListCategoriesUrl: () => string;
/**
 * @summary List all product categories
 */
export declare const listCategories: (options?: RequestInit) => Promise<Category[]>;
export declare const getListCategoriesQueryKey: () => readonly ["/api/categories"];
export declare const getListCategoriesQueryOptions: <TData = Awaited<ReturnType<typeof listCategories>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listCategories>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listCategories>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListCategoriesQueryResult = NonNullable<Awaited<ReturnType<typeof listCategories>>>;
export type ListCategoriesQueryError = ErrorType<unknown>;
/**
 * @summary List all product categories
 */
export declare function useListCategories<TData = Awaited<ReturnType<typeof listCategories>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listCategories>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListTypesUrl: () => string;
/**
 * @summary List all project types
 */
export declare const listTypes: (options?: RequestInit) => Promise<ProjectType[]>;
export declare const getListTypesQueryKey: () => readonly ["/api/types"];
export declare const getListTypesQueryOptions: <TData = Awaited<ReturnType<typeof listTypes>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listTypes>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listTypes>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListTypesQueryResult = NonNullable<Awaited<ReturnType<typeof listTypes>>>;
export type ListTypesQueryError = ErrorType<unknown>;
/**
 * @summary List all project types
 */
export declare function useListTypes<TData = Awaited<ReturnType<typeof listTypes>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listTypes>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListServicesUrl: () => string;
/**
 * @summary List all workshop services
 */
export declare const listServices: (options?: RequestInit) => Promise<Service[]>;
export declare const getListServicesQueryKey: () => readonly ["/api/services"];
export declare const getListServicesQueryOptions: <TData = Awaited<ReturnType<typeof listServices>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listServices>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listServices>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListServicesQueryResult = NonNullable<Awaited<ReturnType<typeof listServices>>>;
export type ListServicesQueryError = ErrorType<unknown>;
/**
 * @summary List all workshop services
 */
export declare function useListServices<TData = Awaited<ReturnType<typeof listServices>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listServices>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListBlogPostsUrl: (params?: ListBlogPostsParams) => string;
/**
 * @summary List all blog posts
 */
export declare const listBlogPosts: (params?: ListBlogPostsParams, options?: RequestInit) => Promise<BlogPost[]>;
export declare const getListBlogPostsQueryKey: (params?: ListBlogPostsParams) => readonly ["/api/blog", ...ListBlogPostsParams[]];
export declare const getListBlogPostsQueryOptions: <TData = Awaited<ReturnType<typeof listBlogPosts>>, TError = ErrorType<unknown>>(params?: ListBlogPostsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listBlogPosts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listBlogPosts>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListBlogPostsQueryResult = NonNullable<Awaited<ReturnType<typeof listBlogPosts>>>;
export type ListBlogPostsQueryError = ErrorType<unknown>;
/**
 * @summary List all blog posts
 */
export declare function useListBlogPosts<TData = Awaited<ReturnType<typeof listBlogPosts>>, TError = ErrorType<unknown>>(params?: ListBlogPostsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listBlogPosts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetBlogPostUrl: (id: string) => string;
/**
 * @summary Get a blog post by ID
 */
export declare const getBlogPost: (id: string, options?: RequestInit) => Promise<BlogPost>;
export declare const getGetBlogPostQueryKey: (id: string) => readonly [`/api/blog/${string}`];
export declare const getGetBlogPostQueryOptions: <TData = Awaited<ReturnType<typeof getBlogPost>>, TError = ErrorType<void>>(id: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getBlogPost>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getBlogPost>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetBlogPostQueryResult = NonNullable<Awaited<ReturnType<typeof getBlogPost>>>;
export type GetBlogPostQueryError = ErrorType<void>;
/**
 * @summary Get a blog post by ID
 */
export declare function useGetBlogPost<TData = Awaited<ReturnType<typeof getBlogPost>>, TError = ErrorType<void>>(id: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getBlogPost>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetHomepageDataUrl: () => string;
/**
 * @summary Aggregated homepage data (featured products, services, recent blog)
 */
export declare const getHomepageData: (options?: RequestInit) => Promise<HomepageData>;
export declare const getGetHomepageDataQueryKey: () => readonly ["/api/homepage"];
export declare const getGetHomepageDataQueryOptions: <TData = Awaited<ReturnType<typeof getHomepageData>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getHomepageData>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getHomepageData>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetHomepageDataQueryResult = NonNullable<Awaited<ReturnType<typeof getHomepageData>>>;
export type GetHomepageDataQueryError = ErrorType<unknown>;
/**
 * @summary Aggregated homepage data (featured products, services, recent blog)
 */
export declare function useGetHomepageData<TData = Awaited<ReturnType<typeof getHomepageData>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getHomepageData>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export {};
//# sourceMappingURL=api.d.ts.map