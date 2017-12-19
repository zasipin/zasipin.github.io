import React from 'react';
import { connect } from 'react-redux';
import { setActiveLanguage, getLanguages, getActiveLanguage } from 'react-localize-redux';

const LanguageSelector = ({ languages, setActiveLanguage, currentLanguage }) => (
  <select value={currentLanguage} className="language-selector" onChange={ (e) => setActiveLanguage(e.target.value) }>
    { languages.map(language => 
      <option key={language.code} value={ language.code }>{language.code}</option>
    )}
  </select>
)

const mapStateToProps = state => (
  { 
    languages: getLanguages(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code
  });
const mapDispatchToProps = { setActiveLanguage };

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelector);