import * as handlebars from 'handlebars';
import { forgotPasswordTemplate } from '../templates/forgtoPasswordTemplate';

export const compileForgotPasswordTemplate = ({
  username,
  url,
}: {
  username: string;
  url: string;
}) => {
  const template = handlebars.compile(forgotPasswordTemplate);
  const htmlBody = template({
    username,
    url,
  });

  return htmlBody;
};
