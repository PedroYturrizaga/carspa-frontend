import { SigsFrontendPage } from './app.po';

describe('sigs-frontend App', () => {
  let page: SigsFrontendPage;

  beforeEach(() => {
    page = new SigsFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
