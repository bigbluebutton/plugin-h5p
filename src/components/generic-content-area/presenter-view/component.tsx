import { useState } from 'react';
import * as React from 'react';
import { PresenterViewComponentProps, UserToBeRendered } from './types';
import * as Styled from './styles';
import PageContainerForLiveUpdates from './page-container/component';
import { Button } from './button/component';

const MAX_NUMBER_OF_USERS_PER_PAGE = 16;

function PresenterViewComponent(props: PresenterViewComponentProps) {
  const {
    pluginApi, contentAsJson, h5pAsJson, listOfStudentsWithH5pState,
  } = props;

  const [currentPage, setCurrentPage] = useState(0);

  const isPaginated = listOfStudentsWithH5pState?.length > MAX_NUMBER_OF_USERS_PER_PAGE;

  let paginatedList: UserToBeRendered[][] = [];
  if (isPaginated) {
    paginatedList = listOfStudentsWithH5pState.reduce((acc, curr, index) => {
      const pageIndex = Math.floor(index / MAX_NUMBER_OF_USERS_PER_PAGE);
      if (acc.length <= pageIndex) acc.push([]);
      acc[pageIndex].push(curr);
      return acc;
    }, [] as UserToBeRendered[][]);
  } else {
    paginatedList = [listOfStudentsWithH5pState];
  }
  const totalNumberOfPages = paginatedList.length;

  const handleChangePage = (delta: number) => {
    const newCurrentPage = currentPage + delta;
    if (newCurrentPage < totalNumberOfPages && newCurrentPage >= 0) {
      setCurrentPage(newCurrentPage);
    }
  };

  return (
    <Styled.PresenterView>
      {
        (isPaginated && currentPage > 0)
        && (
          <Button
            iconName="left_arrow"
            onClick={() => handleChangePage(-1)}
          />
        )
      }
      <PageContainerForLiveUpdates
        pluginApi={pluginApi}
        contentAsJson={contentAsJson}
        listOfStudentsToBeRendered={paginatedList[currentPage]}
        h5pAsJson={h5pAsJson}
      />
      {
        (isPaginated && currentPage + 1 < totalNumberOfPages)
        && (
          <Button
            iconName="right_arrow"
            onClick={() => handleChangePage(1)}
          />
        )
      }
    </Styled.PresenterView>
  );
}

export default PresenterViewComponent;
