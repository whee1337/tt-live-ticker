
    import { useState } from 'react';
    import { Navbar, Center, Tooltip, createStyles, Stack, Image } from '@mantine/core';
    import {
      TablerIcon,
      IconHistory,
      IconSatellite,
      IconCalendar,
      IconLogout,
      IconSwitchHorizontal,
    } from '@tabler/icons';
    import logo from '../../assets/icon.png';
import { Link } from '@remix-run/react';

    const useStyles = createStyles((theme) => ({
      link: {
        width: 50,
        height: 50,
        borderRadius: theme.radius.md,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color:"#1A1A1A",
        opacity: 0.85,
    
        '&:hover': {
          opacity: 1,
          color: theme.fn.lighten(
            theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
            0.1
          ),
        },
      },
    
      active: {
        opacity: 1,
        '&, &:hover': {
          backgroundColor: theme.fn.lighten(
            theme.fn.variant({ variant:'filled', color: theme.primaryColor }).background!,
            0.15
          ),
          color:"white"
        },
      },
    }));
    
    interface NavbarLinkProps {
      icon: TablerIcon;
      label: string;
      active?: boolean;
      onClick?(): void;
      destination?:string;
    }
    
    function NavbarLink({ icon: Icon, label, active, onClick, destination }: NavbarLinkProps) {
      const { classes, cx } = useStyles();
      return (
        <Tooltip label={label} position="right" transitionDuration={0}>
          <Link onClick={onClick} className={cx(classes.link, { [classes.active]: active })} to={destination ?? ""}>
            <Icon stroke={1.5} />
          </Link>
        </Tooltip>
      );
    }
    
    const mockdata = [
      { icon: IconSatellite, label: 'Live-Spiele', destination:"/livegames" },
      { icon: IconHistory, label: 'Gestreamte Spiele',destination:"" },
      { icon: IconCalendar, label: 'Spielplan',destination:"" }
    ];
    
    export default function SideNavbar() {
      const [active, setActive] = useState(0);
    
      const links = mockdata.map((link, index) => (
        <NavbarLink
          {...link}
          key={link.label}
          active={index === active}
          destination={link.destination}
          onClick={() => setActive(index)}
        />
      ));
    
      return (
        <Navbar
          height={"100%"}
          width={{ base: 80 }}
          p="md"
          sx={(theme) => ({
            backgroundColor: theme.fn.variant({ variant: 'outline', color: theme.primaryColor})
              .background,
              position:"absolute",
              left:"0",
              top:"0",
              zIndex:100
          })}
        >
          <Center>
            <Image
              radius="md"
              src={logo}
              />
          </Center>
          <Navbar.Section grow mt={40}>
            <Stack justify="center" spacing={0}>
              {links}
            </Stack>
          </Navbar.Section>
          <Navbar.Section>
            <Stack justify="center" spacing={0}>
              <NavbarLink icon={IconSwitchHorizontal} label="Change account" />
              <NavbarLink icon={IconLogout} label="Logout" />
            </Stack>
          </Navbar.Section>
        </Navbar>
      );
    }