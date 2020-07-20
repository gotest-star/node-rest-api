import { MongoRepository } from 'typeorm';

export const mockRepository = <Entity>(repository: Entity, useValue?: any) => {
  const useClass = useValue ? undefined : repository;
  console.log(getRepositoryToken(repository));
  return {
    useValue,
    useClass,
    provide: getRepositoryToken(repository),
  };
};

const getRepositoryToken = (entity: any) => {
  let token = entity.name;

  if (!(entity.prototype instanceof MongoRepository)) {
    token = token + 'Repository';
  }

  return token;
};
