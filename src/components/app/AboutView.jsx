//react
import React, {Component} from 'react';

//custom components
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';

class AboutView extends Component {
    render() {
        return(
            <div>
                <div id="background">
                    <HeaderComponent/>
                    <div className='content'>
                        <h1 id="site-title">About</h1>
                        <p id="site-desc">
                            In vitae odio viverra, placerat tortor sit amet, maximus ligula. Fusce ultricies eros metus, eget pharetra odio scelerisque a. 
                            Cras tincidunt ex non magna pellentesque euismod. Pellentesque a massa tristique, tristique sapien efficitur, tristique ante. 
                            Mauris risus arcu, auctor sed eleifend vitae, porttitor at diam. Maecenas non justo condimentum, faucibus arcu quis, tempor mi. 
                            Maecenas molestie egestas velit, quis tristique ipsum elementum a. In at sollicitudin leo. 
                            Proin neque nisi, aliquam posuere pellentesque eget, iaculis consectetur metus. 
                            Vivamus scelerisque tortor volutpat orci faucibus rhoncus. Nullam pretium ante ac tincidunt posuere. 
                            Morbi rutrum ultrices ipsum at porttitor. Donec eu tellus massa. In fringilla tincidunt leo in suscipit.
                        </p>
                    </div>
                    
                </div>
                <FooterComponent/>
            </div>
            
        );
    }
}

export default AboutView;